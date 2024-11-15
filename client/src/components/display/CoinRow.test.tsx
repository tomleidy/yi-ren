import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CoinRow from './CoinRow';
import { CoinsProvider } from '../../context/CoinsContext';
import { ActiveReadingProvider } from '../../context/ActiveReadingContext';
import { coinBlended } from '../../assets/images';

describe('CoinRow', () => {
    it('renders three coins', () => {
        render(
            <ActiveReadingProvider>
                <CoinsProvider>
                    <CoinRow />
                </CoinsProvider>
            </ActiveReadingProvider>
        );

        const coins = screen.getAllByRole('img');

        expect(coins).toHaveLength(3);
        coins.forEach((coin, idx) => {
            expect(coin.getAttribute('src')).toMatch(coinBlended);
            expect(coin).toHaveProperty('alt', `Coin ${idx + 1}`);
        });
    });
});