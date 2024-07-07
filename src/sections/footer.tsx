import { GetStoreId } from "../shared/projectSettigs";

const Footer = () => {
  const [storeId] = GetStoreId();
  return (
    <>
      <footer className="relative bottom-0 w-full flex flex-col items-center">
        <div className="flex flex-col justify-center items-center pb-[20px] max-w-[1040px]">
          <a
            className="bg-white shadow-lg text-[14px] font-normal p-2 border border-gray-100 rounded-md text-gray-600 hover:bg-gray-100"
            href={`https://ireserve.shop?ref=${storeId}`}
          >
            Made with iReserve
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
