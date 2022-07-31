export default function ({ embedId }) {
    return (
        <iframe
            width="100%"
            height="500rem"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allowFullScreen
        />
    )
}
