import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EventCard from '../../components/EventCard';

describe('EventCard component', () => {
  it('renders without crashing', () => {
    const event = {
      id: 1,
      title: 'Test Event',
      description: 'Test Description',
      date: '2025-10-01T10:00:00Z',
      location: 'Paris',
      capacity: 50,
      categories: [],
      tags: [],
    };
    render(<EventCard {...event} />);
    expect(screen.getByText('Test Event')).toBeInTheDocument();
  });
});
