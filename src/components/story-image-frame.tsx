import { useState } from "react";

type StoryImageFrameProps = {
  src: string | null;
  alt: string;
  title: string;
  text: string;
};

export function StoryImageFrame({
  src,
  alt,
  title,
  text,
}: StoryImageFrameProps) {
  // Associate loading state with the URL itself. A useEffect reset races with
  // browser-cached images: their load event can fire before the reset and
  // leave the placeholder visible forever.
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const loaded = Boolean(src && loadedSrc === src);

  return (
    <div className="story-page-split">
      <div className="story-image-frame">
        {!loaded && (
          <div className="story-image-placeholder" role="status">
            <div className="image-placeholder-orbit" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <p className="image-placeholder-text">Dibujando la escena…</p>
          </div>
        )}
        {src && (
          <img
            key={src}
            className={loaded ? "story-image is-loaded" : "story-image"}
            src={src}
            alt={alt}
            onLoad={() => setLoadedSrc(src)}
            onError={() => setLoadedSrc(null)}
          />
        )}
      </div>
      <article className="story-reading-copy">
        <h1>{title}</h1>
        <p>{text}</p>
      </article>
    </div>
  );
}
