import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getallnotes } from '../services/apicalls'

function Notelist() {

  const [notes,setnote] = useState([])
  
  const navigate = useNavigate()

  async function fetchnotes() {

    let res = await getallnotes()
    console.log(res.data)
    setnote(res.data)
    
    

  }

  useEffect(()=>{fetchnotes()},[])


  function ViewNote(i){
    console.log(i)

    navigate(`/notedetails?id=${i}`)
  }

 
return (
  <div className="container py-5">

    {/* Header */}
    <div className="d-flex justify-content-between align-items-center mb-5">

      <div>
        <span className="badge bg-primary-subtle text-primary mb-2">
          PERSONAL WORKSPACE
        </span>

        <h1 className="fw-bold text-dark mb-1">
          📝 My Notes
        </h1>

        <p className="text-muted mb-0">
          Manage and revisit all your notes in one place.
        </p>
      </div>

      {/* Logged in user */}
      {notes.length > 0 && (
        <div className="d-flex align-items-center gap-3 bg-white border rounded-pill px-3 py-2 shadow-sm">

          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "42px", height: "42px" }}>
            <strong>
              {notes[0].username?.charAt(0).toUpperCase()}
            </strong>
          </div>

          <div>
            <small className="text-muted d-block">
              Logged in as
            </small>

            <strong className="text-dark">
              {notes[0].username}
            </strong>
          </div>

        </div>
      )}

    </div>


    {/* Notes heading */}
    <div className="d-flex justify-content-between align-items-center mb-4">

      <div>
        <h5 className="fw-bold mb-1">
          Your Notes
        </h5>

        <small className="text-muted">
          {notes.length} {notes.length === 1 ? "note" : "notes"} available
        </small>
      </div>

      <span className="badge bg-primary rounded-pill fs-6 px-3 py-2">
        {notes.length}
      </span>

    </div>


    {/* Notes Grid */}
    <div className="row g-4">

      {notes.map((i) => (

        <div className="col-xl-4 col-lg-6 col-md-6" key={i.id}>

          <div className="card h-100 border-0 shadow-sm">

            {/* Card Header */}
            <div className="card-header bg-primary bg-opacity-10 border-0 d-flex justify-content-between align-items-center py-3">

              <span className="badge bg-primary rounded-pill">
                📝 Note
              </span>

              <small className="text-muted">
                #{i.id}
              </small>

            </div>


            {/* Card Body */}
            <div className="card-body p-4 d-flex flex-column">

              <h5 className="card-title fw-bold text-dark mb-3">
                {i.title}
              </h5>

              <p className="card-text text-secondary flex-grow-1">
                {i.content?.length > 120
                  ? i.content.substring(0, 120) + "..."
                  : i.content}
              </p>


              {/* Divider */}
              <hr className="text-muted opacity-25" />


              {/* Metadata */}
              <div className="d-flex justify-content-between align-items-center mb-3">

                <small className="text-muted">
                  👤 {i.username}
                </small>

                {i.created_at && (
                  <small className="text-muted">
                    📅 {new Date(i.created_at).toLocaleDateString()}
                  </small>
                )}

              </div>


              {/* View Button */}
              <button
                type="button"
                className="btn btn-primary w-100"
                onClick={() => ViewNote(i.id)}
              >
                🔍 View Note
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>


    {/* Empty State */}
    {notes.length === 0 && (

      <div className="card border-0 shadow-sm text-center py-5 mt-4">

        <div className="card-body">

          <div className="display-4 mb-3">
            📝
          </div>

          <h4 className="fw-bold">
            No notes yet
          </h4>

          <p className="text-muted mb-0">
            Create your first note to get started.
          </p>

        </div>

      </div>

    )}

  </div>
);




}

export default Notelist
