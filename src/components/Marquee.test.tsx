import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Marquee from './Marquee';

describe('Marquee Component', () => {
  it('renders default items correctly', () => {
    render(<Marquee />);
    const elements = screen.getAllByText('Read. Post. Repeat.');
    expect(elements.length).toBeGreaterThan(0);
  });

  it('repeats multiple items correctly', () => {
    render(<Marquee items={['Learn', 'Build', 'Share']} />);
    const learnElements = screen.getAllByText('Learn');
    const buildElements = screen.getAllByText('Build');
    const shareElements = screen.getAllByText('Share');
    
    expect(learnElements.length).toBeGreaterThan(0);
    expect(buildElements.length).toBeGreaterThan(0);
    expect(shareElements.length).toBeGreaterThan(0);
    
    // Total should be 12 items * 3 = 36 or at least equal counts
    expect(learnElements.length).toBe(buildElements.length);
    expect(buildElements.length).toBe(shareElements.length);
  });
});
