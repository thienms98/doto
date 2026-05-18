const dateFormat = new Intl.DateTimeFormat("vi-VN", {
  weekday: "long",
  day: "2-digit",
  month: "2-digit"
});
const now = dateFormat.format(Date.now());

const Header = () => {
  return (
    <header className="col-span-2 flex justify-between p-3">
      <h1 className="font-bold text-lg leading-7">DOTO</h1>

      <div className="flex gap-3 items-center text-sm">
        <span>{now}</span>

        <div className="size-7 rounded-full bg-white text-black text-xs overflow-hidden flex items-center justify-center cursor-pointer">
          HT
        </div>
      </div>
    </header>
  );
};

export default Header;
