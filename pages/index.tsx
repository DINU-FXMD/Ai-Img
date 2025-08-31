import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [aspect, setAspect] = useState("1024x1024");
  const [style, setStyle] = useState("realistic");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, aspect, style }),
      });
      const data = await res.json();
      setImageUrl(data.url);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-green-500 text-center mb-6">
        TECH WITH DASUN AI IMAGE Generator
      </h1>

      <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow-lg space-y-4">
        <textarea
          className="w-full p-3 rounded-lg bg-gray-800 text-white outline-none"
          rows={3}
          placeholder="Enter your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-2 text-sm">Aspect Ratio</p>
            <select
              className="w-full p-2 bg-gray-800 rounded"
              value={aspect}
              onChange={(e) => setAspect(e.target.value)}
            >
              <option value="1024x1024">1:1 (1024x1024)</option>
              <option value="1920x1080">16:9 (1080p)</option>
              <option value="3840x2160">16:9 (4K)</option>
              <option value="1080x1920">9:16 (Vertical)</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-sm">Style</p>
            <select
              className="w-full p-2 bg-gray-800 rounded"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="realistic">Realistic</option>
              <option value="3d">3D Animated</option>
              <option value="cartoon">Cartoon</option>
              <option value="anime">Anime</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateImage}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-lg p-3 rounded-xl"
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>

        {imageUrl && (
          <div className="mt-6 text-center">
            <img
              src={imageUrl}
              alt="Generated"
              className="mx-auto rounded-2xl shadow-lg max-h-[500px]"
            />
            <a
              href={imageUrl}
              download
              className="block mt-3 text-green-400 underline"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
