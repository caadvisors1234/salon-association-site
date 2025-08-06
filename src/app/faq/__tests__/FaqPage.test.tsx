import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FaqPage from '../page';

describe('FaqPage', () => {
  // Mock next/image
  jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: Record<string, unknown>) => {
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      return <img {...props} />;
    },
  }));

  it('should render the page title', () => {
    render(<FaqPage />);
    expect(screen.getByRole('heading', { name: 'よくある質問' })).toBeInTheDocument();
  });

  it('should toggle the accordion state on click', async () => {
    const user = userEvent.setup();
    render(<FaqPage />);

    const firstQuestion = screen.getByText('AIに関する専門知識がなくても利用できますか？');
    
    // The trigger button is what controls the state
    const triggerButton = firstQuestion; 
    const itemContainer = triggerButton.closest('[data-slot="accordion-item"]');

    // Initially, the state should be 'closed'
    expect(itemContainer).toHaveAttribute('data-state', 'closed');
    
    // Click the question to open the accordion
    await user.click(triggerButton);
    
    // Now, the state should be 'open'
    await waitFor(() => {
      expect(itemContainer).toHaveAttribute('data-state', 'open');
    });

    // Click the question again to close the accordion
    await user.click(triggerButton);
    
    // The state should be 'closed' again
    await waitFor(() => {
      expect(itemContainer).toHaveAttribute('data-state', 'closed');
    });
  });
}); 