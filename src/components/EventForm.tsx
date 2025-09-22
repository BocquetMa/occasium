import { useState } from 'react';

interface EventFormProps {
  onSubmit: (data: any) => void;
  initialValues?: any;
}

export default function EventForm({ onSubmit, initialValues }: EventFormProps) {
  const [form, setForm] = useState({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    date: initialValues?.date || '',
    location: initialValues?.location || '',
    capacity: initialValues?.capacity || 0,
    categoryIds: initialValues?.categoryIds || [],
    tagIds: initialValues?.tagIds || [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 w-full"/>
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full"/>
      <input type="datetime-local" name="date" value={form.date} onChange={handleChange} className="border p-2 w-full"/>
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="border p-2 w-full"/>
      <input type="number" name="capacity" placeholder="Capacity" value={form.capacity} onChange={handleChange} className="border p-2 w-full"/>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
