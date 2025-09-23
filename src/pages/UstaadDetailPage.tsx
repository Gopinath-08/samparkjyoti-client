import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const UstaadDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/jobs/public/ustaads/${id}`);
        const d = res.data?.data?.ustaad || res.data?.ustaad || res.data;
        setData(d);
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container" style={{ color: '#dc2626' }}>{error}</div>;
  if (!data) return <div className="container">Not found</div>;

  return (
    <div className="container" style={{ padding: 24 }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 12 }}>← Back</button>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, maxWidth: 900 }}>
        <h2 style={{ marginTop: 0 }}>{data.name}</h2>
        <div style={{ color: '#6b7280', marginBottom: 8 }}>{data.speciality || '-'}</div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <span>📍 {data.location || '-'}</span>
          <span>⭐ {data.rating ?? 0}</span>
          {data.minimumWage != null && <span>₹ {data.minimumWage}</span>}
        </div>
        {data.experience && <div><strong>Experience:</strong> {data.experience}</div>}
        {data.phone && <div><strong>Phone:</strong> {data.phone}</div>}
        {Array.isArray(data.skills) && data.skills.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <strong>Skills:</strong>
            <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {data.skills.map((s: string, idx: number) => (
                <span key={idx} style={{ padding: '4px 8px', background: '#f3f4f6', borderRadius: 999, fontSize: 12 }}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {data.bio && (
          <div style={{ marginTop: 12 }}>
            <strong>Bio/Notes:</strong>
            <div style={{ marginTop: 6, whiteSpace: 'pre-wrap' }}>{data.bio}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UstaadDetailPage;


