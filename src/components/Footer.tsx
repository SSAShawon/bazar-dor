const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-7 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="font-semibold text-gray-900">
          বাজার দর
          <span className="ml-2 font-normal text-gray-500">
            — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </span>
        </p>

        <p className="text-sm text-gray-500">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;