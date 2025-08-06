import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PageHeader } from '../PageHeader';

describe('PageHeader', () => {
  it('renders title and description', () => {
    const title = 'Test Title';
    const description = 'Test Description';
    const imageUrl = 'https://example.com/image.jpg';

    render(<PageHeader title={title} description={description} imageUrl={imageUrl} />);

    // Check if the title is rendered
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');

    // Check if the description is rendered
    const descriptionElement = screen.getByText(description);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.tagName).toBe('P');
  });
}); 