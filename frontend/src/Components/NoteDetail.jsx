import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { deleteNote, noteDetail } from '../services/apicalls'

function NoteDetail() {

    const [note,setnote] = useState({})
    const navigate = useNavigate()
    const {search}  = useLocation()
    console.log(search)

    const queryparams = new URLSearchParams(search)

    const i = queryparams.get('id')
    console.log(i)

    async function notedetail(params) {

        let res = await noteDetail (i)
        setnote(res.data)
        
    }

    useEffect(()=>{notedetail(),[]})

    function UpdateNote(i){

        navigate(`/updatenote/${i}`)
    }


    async function DeleteNote() {

        console.log('delete')
        let res =  await deleteNote(i)
        if (res.status == '204'){
            navigate('/')
        }
        
    }

  return (

<div className="container py-5">

  <div className="row justify-content-center">

    <div className="col-lg-9">

      {/* Header */}
      <div className="mb-4">

        <span className="badge bg-primary-subtle text-primary mb-3 px-3 py-2">
          📝 NOTE DETAILS
        </span>

        <h1 className="fw-bold text-dark mb-2">
          {note.title}
        </h1>

        <p className="text-muted mb-0">
          View and manage your note.
        </p>

      </div>


      {/* Note Card */}
      <div className="card border-0 shadow-sm">

        <div className="card-body p-4 p-md-5">

          {/* Note Header */}
          <div className="d-flex justify-content-between align-items-start mb-4">


            <span className="badge bg-light text-muted border">
              #{note.id}
            </span>

          </div>


          {/* Divider */}
          <hr className="text-muted opacity-25" />


          {/* Note Content */}
          <div className="py-3">

            <h6 className="fw-bold text-dark mb-3">
              Content
            </h6>

            <p
              className="text-secondary lh-lg mb-0"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {note.content}
            </p>

          </div>


          {/* Metadata */}
          <div className="bg-light rounded p-3 mt-4 mb-4">

            <div className="row g-3">

              <div className="col-md-6">

                <small className="text-muted d-block mb-1">
                  👤 Created by
                </small>

                <strong className="text-dark">
                  {note.username}
                </strong>

              </div>


              <div className="col-md-6">

                <small className="text-muted d-block mb-1">
                  📅 Created on
                </small>

                <strong className="text-dark">
                  {note.created_at
                    ? new Date(note.created_at).toLocaleDateString()
                    : "N/A"}
                </strong>

              </div>

            </div>

          </div>


         

          {/* Actions */}
          <div className="d-flex gap-2">

            <button
              className="btn btn-primary btn-lg flex-grow-1"
              onClick={() => UpdateNote(note.id)}
            >
              ✏️ Edit Note
            </button>

            <button
              className="btn btn-outline-danger btn-lg"
              onClick={() => DeleteNote(note.id)}
            >
              🗑️ Delete
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>


  )
}

export default NoteDetail
