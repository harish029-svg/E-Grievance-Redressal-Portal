import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page-light">
      <Navbar />

      <main className="container py-24">

        {/* Page Header */}
        <div className="mb-10 text-center">
          <div className="users-header">

  <div>

    <span className="page-badge">
      ACCOUNT
    </span>

    <h1 className="users-title">
      👤 My Profile
    </h1>

    <p className="users-subtitle">
      View and manage your personal information and account details.
    </p>

  </div>

</div>

         
        </div>

        {/* Profile Card */}
        <div className="card max-w-5xl mx-auto">

  {/* Top Section */}

  <div
    className="flex items-center gap-6 mb-8 pb-6"
    style={{ borderBottom: "1px solid #E2E8F0" }}
  >

    <div
      style={{
        width: "90px",
        height: "90px",
        borderRadius: "50%",
        background: "linear-gradient(135deg,#2563EB,#3B82F6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "38px",
        fontWeight: "700",
      }}
    >
      {user?.name?.charAt(0).toUpperCase()}
    </div>

    <div>

      <h2 className="text-3xl font-bold">
        {user?.name}
      </h2>

      <p className="text-gray-500 mt-2">
        {user?.role?.toUpperCase()}
      </p>

    </div>

  </div>

  {/* Details */}

  <div className="grid gap-6 md:grid-cols-2">

    <div className="card">
      <p className="text-sm text-gray-500">Full Name</p>

      <h3 className="text-xl font-semibold mt-2">
        {user?.name}
      </h3>
    </div>

    <div className="card">
      <p className="text-sm text-gray-500">Email Address</p>

      <h3 className="text-xl font-semibold mt-2">
        {user?.email}
      </h3>
    </div>

    <div className="card">
      <p className="text-sm text-gray-500">Role</p>

      <h3 className="text-xl font-semibold mt-2">
        {user?.role}
      </h3>
    </div>

    <div className="card">
      <p className="text-sm text-gray-500">Account Status</p>

      <h3
        style={{
          color: "#22C55E",
          fontWeight: "700",
          marginTop: "8px",
        }}
      >
        Active
      </h3>
    </div>

  </div>

  {/* Buttons */}

  <div className="flex gap-4 justify-end mt-8">

    

    <button
      className="btn btn-primary"
      onClick={logout}
    >
      Logout
    </button>

  </div>

</div>

      </main>
    </div>
  );
};

export default Profile;