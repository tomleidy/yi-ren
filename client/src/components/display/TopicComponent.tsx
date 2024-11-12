import React from 'react';
import { useVisibility } from '../../context/VisibilityContext';
import { useActiveReading } from '../../context/ActiveReadingContext';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const TopicComponent: React.FC = () => {
    const { visibility, toggle } = useVisibility();
    const { topic, setTopic } = useActiveReading();
    const isVisible = visibility['topicInput'];

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.slice(0, 200);
        setTopic(value);
    };

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <button
                onClick={() => toggle('topicInput')}
                className="flex items-center gap-2 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
                {isVisible ? (
                    <>
                        Hide Topic <ChevronUpIcon className="h-4 w-4" />
                    </>
                ) : (
                    <>
                        Show Topic <ChevronDownIcon className="h-4 w-4" />
                    </>
                )}
            </button>

            {isVisible && (
                <div className="relative mt-2">
                    <textarea
                        value={topic}
                        onChange={handleChange}
                        placeholder="What is your question or topic for this reading?"
                        className="w-full p-3 border rounded-lg resize-none
                                 bg-white dark:bg-gray-800
                                 border-gray-300 dark:border-gray-600
                                 text-gray-900 dark:text-gray-100
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={2}
                    />
                    <div className="absolute bottom-2 right-2 text-xs text-gray-500 dark:text-gray-400">
                        {topic.length}/200
                    </div>
                </div>
            )}
        </div>
    );
};

export default TopicComponent;