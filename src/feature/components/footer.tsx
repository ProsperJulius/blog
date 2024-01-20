export const Footer = () => {
  const currentYear = new Date();

  return (
    <>
      <div className="footer-main text-black py-5">
        <hr />
        <div className="fs-4 text-center">
          <small>
            Copyright &copy; {currentYear.getFullYear()} by BinaryParlour. All
            rights reserved
          </small>
        </div>
      </div>
    </>
  );
};
