"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IAffiliateLink } from "@/models/AffiliateLink";

export default function AffiliateLinkDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [link, setLink] = useState<IAffiliateLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Editable fields
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchLink() {
      try {
        setError(null);
        setSuccess(null);
        setLoading(true);
        const res = await fetch(`/api/affiliate-links/${id}`);
        if (!res.ok) throw new Error("Failed to fetch affiliate link");
        const data = await res.json();
        setLink(data);
        setUrl(data.url ?? "");
        setImageUrl(data.imageUrl ?? "");
        setDescription(data.description ?? "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchLink();
  }, [id]);

  const handleDelete = async () => {
    setError(null);
    setSuccess(null);
    setDeleting(true);
    try {
      const res = await fetch(`/api/affiliate-links/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete affiliate link");
      setSuccess("Affiliate link deleted successfully.");
      setTimeout(() => router.push("/admin/products"), 1200);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setSuccess(null);
    setError(null);
  };

  const handleCancel = () => {
    setEditing(false);
    if (link) {
      setUrl(link.url ?? "");
      setImageUrl(link.imageUrl ?? "");
      setDescription(link.description ?? "");
    }
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(`/api/affiliate-links/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, imageUrl, description }),
      });
      if (!res.ok) throw new Error("Failed to update affiliate link");
      const updated = await res.json();
      setLink(updated);
      setEditing(false);
      setSuccess("Affiliate link updated successfully.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></span>
        <span className="ml-3">Loading...</span>
      </div>
    );

  if (error)
    return (
      <div className="max-w-xl mx-auto mt-8 text-red-500 bg-red-50 p-4 rounded">
        {error}
      </div>
    );

  if (!link)
    return (
      <div className="max-w-xl mx-auto mt-8 text-gray-600">
        Affiliate link not found.
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow rounded p-6">
      <h1 className="text-2xl font-bold mb-4">Affiliate Link Details</h1>
      {success && (
        <div className="mb-4 text-green-700 bg-green-50 p-2 rounded">
          {success}
        </div>
      )}
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">URL</label>
          <input
            type="text"
            value={editing ? url : link.url ?? ""}
            onChange={(e) => setUrl(e.target.value)}
            className={`w-full border px-3 py-2 rounded ${
              editing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!editing}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Image</label>
          <input
            type="text"
            value={editing ? imageUrl : link.imageUrl ?? ""}
            onChange={(e) => setImageUrl(e.target.value)}
            className={`w-full border px-3 py-2 rounded ${
              editing ? "bg-white" : "bg-gray-100"
            }`}
            disabled={!editing}
          />
          {link.imageUrl && !editing && (
            <img
              src={link.imageUrl}
              alt="Affiliate"
              className="mt-2 h-24 rounded border"
            />
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={editing ? description : link.description ?? ""}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full border px-3 py-2 rounded ${
              editing ? "bg-white" : "bg-gray-100"
            }`}
            rows={3}
            disabled={!editing}
          />
        </div>
        <div className="flex gap-3 mt-6">
          {!editing ? (
            <>
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                disabled={saving}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
