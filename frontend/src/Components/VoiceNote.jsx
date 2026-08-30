import React, { useState } from "react";
import { UpdateNote } from "../services/apicalls";

function VoiceNote({
  noteId,
  existingTitle,
  existingContent,
  onUpdated,
  onTranscript,
}) {
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);

  function startListening() {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    setListening(true);
    setMessage("");
    setText("");

    recognition.onresult = async function (event) {

      const transcript =
        event.results[0][0].transcript.trim();

      setText(transcript);

      try {

        // ADD NOTE
        // Just send transcript to AddNote
        if (!noteId) {

          if (onTranscript) {
            onTranscript(transcript);
          }

          setMessage("Voice added to your note.");
        }

        // EDIT NOTE
        else {

          const updatedContent = existingContent
            ? `${existingContent} ${transcript}`
            : transcript;

          const response = await UpdateNote(noteId, {
            title: existingTitle || "Untitled",
            content: updatedContent,
          });

          if (onUpdated) {
            onUpdated(response.data);
          }

          setMessage("Note updated successfully!");
        }

      } catch (error) {

        console.error("Error:", error);
        setMessage("Something went wrong.");

      }

      setListening(false);
    };

    recognition.onerror = function (event) {
      console.log("Speech recognition error:", event.error);
      setMessage("Unable to recognize your voice.");
      setListening(false);
    };

    recognition.onend = function () {
      setListening(false);
    };

    recognition.start();
  }

  return (
    <div className="card border shadow-sm">

      <div className="card-body p-4">

        <div className="d-flex align-items-center gap-3 mb-3">

          <div
            className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "50px",
              height: "50px"
            }}
          >
            🎤
          </div>

          <div>
            <h6 className="fw-bold mb-1">
              Voice to Text
            </h6>

            <small className="text-muted">
              Speak naturally and we'll convert it to text.
            </small>
          </div>

        </div>

        <div className="text-center">

          <button
            type="button"
            className={`btn ${
              listening ? "btn-danger" : "btn-primary"
            } btn-lg px-4`}
            onClick={startListening}
            disabled={listening}
          >
            {listening
              ? "🎙️ Listening..."
              : "🎤 Start Speaking"}
          </button>

        </div>

        {text && (
          <div className="mt-4">

            <label className="form-label fw-semibold">
              Transcript
            </label>

            <div className="bg-light border rounded p-3">
              <p className="mb-0">
                {text}
              </p>
            </div>

          </div>
        )}

        {message && (
          <div className="alert alert-success mt-3 mb-0 py-2">
            <small className="fw-semibold">
              ✓ {message}
            </small>
          </div>
        )}

      </div>

    </div>
  );
}

export default VoiceNote;