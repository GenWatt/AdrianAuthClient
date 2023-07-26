interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Loader({ ...rest }: LoaderProps) {
  return (
    <div {...rest}>
      <div className={`spinner-border text-success`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )
}
