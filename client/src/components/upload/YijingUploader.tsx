import React, { useState, useCallback } from 'react';
import { parse } from 'papaparse';
import { X } from 'lucide-react';
import { useVisibility } from '../../context/VisibilityContext';

interface TitleInfo {
    title: string;
    author: string;
    translator: string | null;
    year: number | null;
}

interface CSVPreviewData {
    columns: string[];
    firstRow: Record<string, string>;
}

const YijingUploader: React.FC = () => {
    const [titleInfo, setTitleInfo] = useState<TitleInfo>({
        title: '',
        author: '',
        translator: null,
        year: null
    });
    const [csvPreview, setCsvPreview] = useState<CSVPreviewData | null>(null);
    const [error, setError] = useState<string>('');
    const { visibility, hide } = useVisibility();
    const isModalOpen = visibility['uploadModal'];

    const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTitleInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
            setError('Please upload a CSV file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const csvText = event.target?.result;
            if (typeof csvText !== 'string') return;

            parse(csvText, {
                header: true,
                preview: 1,
                complete: (results) => {
                    if (results.errors.length > 0) {
                        setError('Error parsing CSV file');
                        return;
                    }

                    setCsvPreview({
                        columns: results.meta.fields || [],
                        firstRow: results.data[0] as Record<string, string>
                    });
                }
            });
        };
        reader.readAsText(file);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement the upload logic
        console.log('Submit:', { titleInfo, csvPreview });
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6 relative">
                <button
                    onClick={() => hide('uploadModal')}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white mt-2">
                    Upload Yijing Text
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={titleInfo.title}
                                onChange={handleTitleInput}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Author
                            </label>
                            <input
                                type="text"
                                name="author"
                                value={titleInfo.author}
                                onChange={handleTitleInput}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Translator
                            </label>
                            <input
                                type="text"
                                name="translator"
                                value={titleInfo.translator || ''}
                                onChange={handleTitleInput}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Year
                            </label>
                            <input
                                type="number"
                                name="year"
                                value={titleInfo.year || ''}
                                onChange={handleTitleInput}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                CSV File
                            </label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}

                    {csvPreview && (
                        <div className="mt-4">
                            <h3 className="text-lg font-medium mb-2">Detected Columns:</h3>
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-x-auto">
                                <div className="flex gap-2 flex-wrap">
                                    {csvPreview.columns.map((column, index) => (
                                        <div
                                            key={index}
                                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full text-sm"
                                        >
                                            {column}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium mb-2">Preview (First Row):</h4>
                                    <pre className="text-xs overflow-x-auto">
                                        {JSON.stringify(csvPreview.firstRow, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default YijingUploader;