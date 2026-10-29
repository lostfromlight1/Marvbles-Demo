type YoutubePlayerProps = {
  youtubeId: string
  title: string
}

export function YoutubePlayer({ youtubeId, title }: YoutubePlayerProps) {
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?rel=0&playsinline=1`

  return (
    <div className="youtube-player">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        loading="lazy"
      />
    </div>
  )
}
