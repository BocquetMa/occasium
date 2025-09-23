import { useState, useEffect } from 'react';

export const useAssociationMembers = (slug?: string) => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`/api/associations/${slug}/members`)
      .then(res => res.json())
      .then(data => setMembers(data))
      .finally(() => setLoading(false));
  }, [slug]);

  return { members, loading };
};