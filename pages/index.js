
import { useState } from "react";

const questionPhrases = {
  1: [
    "Joe was absolutely on fire behind the decks.",
    "His mixing and track selection were next level.",
    "Every song hit just right — the guy knows his stuff.",
    "Joe brought real energy and a killer vibe to the night."
  ],
  2: [
    "He was super responsive and made everything feel easy.",
    "We felt totally taken care of from our first chat.",
    "Joe kept us in the loop, answered every question, and made it stress-free.",
    "His communication was professional, fast, and friendly."
  ],
  3: [
    "The dancefloor was packed all night — people didn’t sit down!",
    "Every single person was dancing, from Nanna to the groomsmen.",
    "The party vibe never dipped once — full dancefloor energy!",
    "We had to drag people off the floor when the lights came on."
  ],
  4: [
    "He even did extra things we didn’t expect — seriously above and beyond.",
    "Joe wasn’t just a DJ, he was part of the crew by the end of the night.",
    "From our entrance to the final track, he went the extra mile.",
    "Joe genuinely cared — and it showed in every detail."
  ],
  5: [
    "We’d recommend him in a heartbeat to anyone getting married.",
    "If you’re thinking about booking Joe, don’t wait. Just do it.",
    "Our guests are still raving about him — we’ll be referring him to everyone.",
    "We’d book him again tomorrow if we could!"
  ]
};

export default function Home() {
  const [answers, setAnswers] = useState({});
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [eventType, setEventType] = useState("");
  const [step, setStep] = useState("form");

  const handleToggle = (id) => {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());

  const generateReview = () => {
    if (!eventType) return alert("Please select what kind of event or connection you had with Joe.");
    const selectedSentences = Object.keys(answers)
      .filter((id) => answers[id])
      .map((id) => {
        const phrases = questionPhrases[id];
        return phrases[Math.floor(Math.random() * phrases.length)];
      });

    const shuffled = shuffleArray(selectedSentences);

    const intros = {
      5: [
        "Hands down, best decision we made for the wedding.",
        "Joe completely exceeded our expectations.",
        "Incredible night, unforgettable energy — Joe delivered big time."
      ],
      4: [
        "Joe was fantastic overall and made the night memorable.",
        "We were really happy with how everything turned out.",
        "Great experience — the vibe was definitely there!"
      ],
      3: [
        "Good experience overall with a few small things to note.",
        "Things went mostly smoothly and Joe did a solid job.",
        "We had a good night and Joe played a big part in that."
      ],
      default: [
        "We appreciated Joe’s efforts and the work he put in.",
        "There were some ups and downs, but we’re grateful overall.",
        "Mixed experience but thankful for what went right."
      ]
    };

    const intro = (intros[rating] || intros.default)[
      Math.floor(Math.random() * (intros[rating] || intros.default).length)
    ];

    const contextMap = {
      wedding: "We hired Joe to DJ and MC our wedding, and",
      corporate: "We had Joe at our corporate function, and",
      vendor: "As a fellow vendor working alongside Joe, I can say",
      other: "We worked with Joe in another capacity, and"
    };
    const context = contextMap[eventType] || "";
    const fullReview = [intro, context, ...shuffled].join(" ");

    setReview(fullReview);
    setStep("review");
  };

  return (
    <main style={{ padding: "2rem", textAlign: "center", backgroundImage: "url(/background.jpg)", backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh", backdropFilter: "brightness(0.9)" }}>
      <div style={ margin: "0 auto", marginBottom: "1rem", width: 160 }>
  <img
    src="https://i.imgur.com/0cSg1kl.png"
    alt="DJ Joe Barrs"
    style={
      width: "100%",
      maxWidth: "100%",
      display: "block",
      margin: "0 auto",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }
  />
</div>
      {step === "form" && (
        <>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "1rem" }}>
          </h1>
          <label style={{ display: "block", margin: "1rem 0", fontWeight: "bold" }}>
            What was your connection to Joe?
            <select value={eventType} onChange={(e) => setEventType(e.target.value)} required style={{ width: "100%", padding: "0.5rem", marginTop: 8 }}>
              <option value="">-- Select an option --</option>
              <option value="wedding">It was our wedding</option>
              <option value="corporate">Corporate event</option>
              <option value="vendor">I worked alongside him</option>
              <option value="other">Other</option>
            </select>
          </label>
            Quick Review Generator
          </h1>
          <div style={{ maxWidth: 400, margin: "1rem auto", textAlign: "left" }}>
            {[1,2,3,4,5].map((id) => (
              <div key={id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <span>{Object.values(questionPhrases)[id - 1][0]}</span>
                <button
                  onClick={() => handleToggle(id)}
                  style={{
                    padding: "0.25rem 1rem",
                    borderRadius: 20,
                    backgroundColor: answers[id] ? "#2563eb" : "#f0f0f0",
                    color: answers[id] ? "white" : "black",
                    border: "none"
                  }}
                >
                  {answers[id] ? "Yes" : "No"}
                </button>
              </div>
            ))}

            <label style={{ display: "block", marginTop: 20 }}>
              Star Rating:
              <input
                type="range"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                style={{ width: "100%", marginTop: 5 }}
              />
              <p style={{ textAlign: "center" }}>{rating} star{rating > 1 ? "s" : ""}</p>
            </label>

            <button
              onClick={generateReview}
              style={{
                marginTop: 20,
                width: "100%",
                backgroundColor: "#2563eb",
                color: "white",
                padding: "0.5rem",
                borderRadius: 6,
                border: "none",
                fontWeight: "bold"
              }}
            >
              Generate Review
            </button>
          </div>
        </>
      )}

      {step === "review" && (
        <div style={{ background: "#f9f9f9", padding: 20, marginTop: 20, borderRadius: 10 }}>
          <p style={{ fontSize: "0.9rem", marginBottom: 10 }}>Copy & paste this review:</p>
          <p style={{ fontStyle: "italic", marginBottom: 20 }}>“{review}”</p>

          <a
            href="https://g.page/r/CaeoRvXj9QTLEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setStep("thanks")}
            style={{
              display: "block",
              backgroundColor: "#22c55e",
              color: "white",
              padding: "0.5rem",
              borderRadius: 6,
              marginBottom: 10,
              textDecoration: "none"
            }}
          >
            Leave 5-Star Review on Google
          </a>

          <a
            href="https://abia.com.au/review/dj-joe-barrs-324"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              backgroundColor: "#6b7280",
              color: "white",
              padding: "0.5rem",
              borderRadius: 6,
              textDecoration: "none"
            }}
          >
            Leave Review on ABIA
          </a>
        </div>
      )}

      {step === "thanks" && (
        <div style={{ background: "#dcfce7", padding: 24, marginTop: 30, borderRadius: 10 }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>You're all done! ✅</h2>
          <p style={{ marginTop: 10 }}>Thanks for supporting a small biz. You're the real MVP 🙌</p>
        </div>
      )}
    </main>
  );
}
