const ProfileTab = () => (
  <>
    {/* Profile Heading */}
    <div className="text-[#2C3E50] font-bold text-[2.5rem] leading-none mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      Profile
    </div>
    {/* Horizontal Line */}
    <div className="w-full h-[0.0625rem] bg-[#E0E6EB] mb-8"></div>
    {/* Profile Image Section */}
    <div className="w-[9.5625rem] h-[1.8125rem] text-[#2C3E50] font-semibold text-[1.5rem] leading-none mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      Profile Image
    </div>
    {/* Image Preview and Upload Area */}
    <div className="relative">
      {/* Image Preview Area */}
      <div className="mb-8">
        <div className="text-[#2C3E50] font-normal text-[1.125rem] leading-none mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
          Image Preview
        </div>
        <div className="w-[18.75rem] h-[18.75rem] rounded-[0.625rem] bg-gray-200 flex items-center justify-center">
          <div className="w-[9.375rem] h-[10.4167rem] flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <path d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
        </div>
      </div>
      {/* Add/Change Image & Drag-and-Drop Area */}
      <div className="absolute left-[20.3125rem] top-0 w-[28rem] h-[20.75rem] flex flex-col" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Add/Change Image Label */}
        <div className="w-[11.125rem] h-[1.375rem] text-[#2C3E50] font-normal text-[1.125rem] leading-none mb-4">
          Add / Change image
        </div>
        {/* Drag & Drop Rectangle */}
        <div className="w-[28rem] h-[18.75rem] bg-white border-2 border-[#E0E6EB] rounded-[0.625rem] flex flex-col items-center justify-center">
          {/* SVG Placeholder */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2C3E50" className="mb-4" width="3rem" height="3rem">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          {/* Drag & Drop Text */}
          <div className="w-[12rem] text-center text-[#2C3E50] font-normal text-[1.125rem] leading-none mb-2">
            Drag & Drop your image here
          </div>
          {/* OR */}
          <div className="w-[12rem] text-center text-[#5D6D7E] font-normal text-[0.75rem] leading-none mb-4">
            OR
          </div>
          {/* Browse File Button */}
          <label className="w-[16.8125rem] h-[3.4375rem] bg-[#F2F5F7] rounded-[0.625rem] flex items-center justify-center cursor-pointer" htmlFor="profile-image-upload">
            <span className="text-[#2C3E50] font-bold text-[1.125rem] leading-none">Browse File</span>
            <input id="profile-image-upload" type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
    {/* Horizontal Line */}
    <div className="w-full h-[0.0625rem] bg-[#E0E6EB] mb-8 mt-8"></div>
    {/* Basic Section */}
    <div className="w-[3.9375rem] h-[1.8125rem] text-[#2C3E50] font-semibold text-[1.5rem] leading-none mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
      Basic
    </div>
    {/* Username Label */}
    <div className="w-[5.4375rem] h-[1.375rem] text-[#2C3E50] font-normal text-[1.125rem] leading-none mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
      Username
    </div>
    {/* Username Input Field */}
    <div className="w-[22.9375rem] h-[3.4375rem] bg-[#F2F5F7] rounded-[0.625rem] flex items-center px-4 mb-6">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="1.125rem" height="1.25rem" stroke="#2C3E50" strokeWidth="1.5">
        <path d="M12.1992 12C14.9606 12 17.1992 9.76142 17.1992 7C17.1992 4.23858 14.9606 2 12.1992 2C9.43779 2 7.19922 4.23858 7.19922 7C7.19922 9.76142 9.43779 12 12.1992 12Z" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M3 22C3.57038 20.0332 4.74796 18.2971 6.3644 17.0399C7.98083 15.7827 9.95335 15.0687 12 15C16.12 15 19.63 17.91 21 22" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
      <input
        type="text"
        defaultValue="AbdelrahmanEmbaby"
        className="ml-4 bg-transparent outline-none border-none text-[#2C3E50] font-normal text-[1.125rem] leading-none w-full"
        style={{ fontFamily: 'Inter, sans-serif' }}
      />
    </div>
    {/* Bio Section */}
    <div className="w-[1.6875rem] h-[1.375rem] text-[#2C3E50] font-normal text-[1.125rem] leading-none mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '1.125rem', lineHeight: '100%' }}>
      Bio
    </div>
    <div className="w-[22.9375rem] h-[3.4375rem] bg-[#F2F5F7] rounded-[0.625rem] flex items-center px-4 mb-6">
      <textarea
        placeholder="Type Here..."
        className="ml-0 bg-transparent outline-none border-none text-[#5D6D7E] font-normal text-[1.125rem] leading-none w-full resize-none"
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '1.125rem', lineHeight: '100%', color: '#5D6D7E', height: '1.375rem', minHeight: '1.375rem', maxHeight: '4.125rem', padding: 0 }}
        rows={1}
      />
    </div>
  </>
);

export default ProfileTab; 