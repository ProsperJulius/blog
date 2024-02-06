import resume from "../../assets/FullstackProsperJulius.pdf";
export const Resume = () => {
  return (
    <div className="mt-5">
      <iframe src={resume} width="100%" height="800px"></iframe>
    </div>
  );
};
