import React, { useEffect } from "react";

const GoogleLogin = () => {
  const CLIENT_ID =
    "748880456839-gdbc7shesgba3lce2tpemjoihum3f2uc.apps.googleusercontent.com"; // <-- ganti dengan Client ID kamu

  useEffect(() => {
    console.log("🔄 useEffect dipanggil, cek google.accounts...");

    const loadGoogleScript = () => {
      if (window.google) {
        console.log("✅ Google Identity Services loaded");
        initGoogle();
      } else {
        console.error("❌ Google script belum siap");
      }
    };

    const initGoogle = () => {
      console.log("⚙️ Inisialisasi GIS...");

      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        {
          theme: "outline",
          size: "large",
        }
      );

      window.google.accounts.id.prompt(); // optional
    };

    const handleCredentialResponse = (response) => {
      console.log("🔑 Login response:", response);
      console.log("✅ Token JWT diterima:", response.credential);

      // Decode JWT untuk ambil info user
      const payload = JSON.parse(atob(response.credential.split(".")[1]));
      console.log("👤 User info:", payload);

      alert(`Hello, ${payload.name} (${payload.email})`);
    };

    // Pastikan script Google sudah ada
    if (!document.getElementById("google-client-script")) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.id = "google-client-script";
      script.onload = loadGoogleScript;
      document.body.appendChild(script);
    } else {
      loadGoogleScript();
    }
  }, []);

  return (
    <div>
      <h2>Login dengan Google</h2>
      <div id="g_id_signin"></div>
    </div>
  );
};

export default GoogleLogin;
