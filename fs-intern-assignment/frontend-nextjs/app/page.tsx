export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1>Welcome</h1>
        <p>Use the navigation to login and manage items easily.</p>
        <div>
          <a href="/items" className="btn btn-blue">View Items</a>
          <a href="/login" className="btn btn-green">Login</a>
        </div>
      </div>
    </div>
  );
}
