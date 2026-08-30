import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Postnote} from '../services/apicalls'
import VoiceNote from './VoiceNote'

function AddNote() {

    const [note,setnote] = useState({'title':'','content':""})
    const navigate = useNavigate()

    async function addnote(event) {
        event.preventDefault()

        console.log(note)

        let res = await Postnote(note)

        console.log(res)

        if (res.status == '201'){
            navigate('/')
        }
      
    }
  return (

<div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-lg-8">

          {/* Header */}
          <div className="mb-4">

            <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
              📝 PERSONAL WORKSPACE
            </span>

            <h1 className="fw-bold text-dark mb-2">
              Create a New Note
            </h1>

            <p className="text-muted mb-0">
              Capture your thoughts, ideas and important information.
            </p>

          </div>


          {/* Note Card */}
          <div className="card border-0 shadow-sm">

            <div className="card-body p-4 p-md-5">

              {/* Card Header */}
              <div className="mb-4">

                <h5 className="fw-bold text-dark mb-1">
                  Write your note
                </h5>

                <p className="text-muted small mb-0">
                  Add a title and describe what you want to remember.
                </p>

              </div>


              <form onSubmit={addnote}>

                {/* Title */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Note Title
                  </label>

                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={note.title}
                    onChange={(event) =>
                      setnote({
                        ...note,
                        title: event.target.value
                      })
                    }
                    placeholder="Give your note a title..."
                  />

                </div>


                {/* Content */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Note Content
                  </label>

                  <textarea
                    className="form-control"
                    rows="10"
                    value={note.content}
                    onChange={(event) =>
                      setnote({
                        ...note,
                        content: event.target.value
                      })
                    }
                    placeholder="Start writing your note..."
                  />

                </div>


               

                {/* Buttons */}
                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg flex-grow-1"
                  >
                    📝 Create Note
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


              {/* Voice Input */}
              <div className="mt-5 pt-4 border-top">

                <div className="text-center mb-4">

                  <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-2">
                    🎤 VOICE INPUT
                  </span>

                  <h5 className="fw-bold text-dark mb-1">
                    Prefer speaking?
                  </h5>

                  <p className="text-muted small mb-0">
                    Speak naturally and turn your voice into a new note.
                  </p>

                </div>

                <VoiceNote
  onTranscript={(transcript) =>
    setnote({
      ...note,
      content: note.content
        ? `${note.content} ${transcript}`
        : transcript
    })
  }
/>

              </div>


            </div>

          </div>

        </div>

      </div>

    </div>



  )
}

export default AddNote
