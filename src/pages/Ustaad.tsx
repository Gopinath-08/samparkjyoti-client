import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Ustaad: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/jobs/public/ustaads');
        const data = res.data?.data || res.data;
        setItems(data?.ustaads || []);
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container" style={{ color: '#dc2626' }}>{error}</div>;

  return (
    <div className="container" style={{ padding: 24 }}>
      <h2>Ustaads</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {items.map((u) => (
          <div key={u._id} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>{u.name}</div>
            <div style={{ color: '#6b7280', margin: '4px 0' }}>{u.speciality || '-'}</div>
            <div style={{ display: 'flex', gap: 12, fontSize: 14 }}>
              <span>📍 {u.location || '-'}</span>
              <span>⭐ {u.rating ?? 0}</span>
              {u.minimumWage != null && <span>₹ {u.minimumWage}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ustaad;


