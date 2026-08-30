import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { noteDetail, UpdateNote } from '../services/apicalls';
import VoiceNote from './VoiceNote';

function EditNote() {
  const navigate = useNavigate();
  const [note, setNote] = useState({});
  const { id } = useParams();

  async function updatenote() {
    try {
      let res = await noteDetail(id);
      setNote(res.data);
    } catch (error) {
      console.log("Error fetching note", error);
    }
  }

  async function editnote(event) {
    event.preventDefault();
    try {
      let res = await UpdateNote(id, note);
      if (res.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.log("Error updating note", error);
    }
  }

  useEffect(() => { updatenote() }, [id]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="mb-4">
            <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
              ✏️ EDIT NOTE
            </span>
            <h1 className="fw-bold text-dark mb-2">Update Your Note</h1>
            <p className="text-muted mb-0">
              Make changes to your note and keep your thoughts up to date.
            </p>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={editnote}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Note Title</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    onChange={(event) =>
                      setNote({ ...note, title: event.target.value })
                    }
                    placeholder="Enter note title..."
                    value={note.title || ""}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Note Content</label>
                  <textarea
                    className="form-control"
                    rows="10"
                    onChange={(event) =>
                      setNote({ ...note, content: event.target.value })
                    }
                    placeholder="Write your note..."
                    value={note.content || ""}
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg flex-grow-1"
                  >
                    ✓ Update Note
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg"
                    onClick={() => navigate('/')}
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <div className="mt-4">
                <h5 className="fw-bold text-dark mb-2">Or update by speaking</h5>
                <p className="text-muted small mb-3">
                  Click the button and speak your changes.
                </p>
                {/* Pass both title and content */}
                <VoiceNote
                    noteId={id}
                    existingTitle={note.title}
                    existingContent={note.content}
                    onUpdated={(updatedNote) => setNote(updatedNote)}
                  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNote;
