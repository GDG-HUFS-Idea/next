export default function LoginButton({ href }: { href: string }) {
  return <button onClick={() => (window.location.href = href)}></button>
}
