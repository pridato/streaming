const GoogleButton = () => {
  return (
    <div className="flex items-center justify-center w-full mb-5">
      <button class="w-full flex items-center justify-center px-4 py-2 border gap-3 rounded-lg text-slate-700 hover:border-[#6037bf] hover:text-slate-900">
        <img
          class="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span className="font-semibold">Login with Google</span>
      </button>
    </div>
  );
};

export default GoogleButton;
