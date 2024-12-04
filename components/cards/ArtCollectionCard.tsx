const ArtCollectionCard = () => {
  return (
    <div className="flex w-full flex-col gap-4 border p-4">
      <h2 className="text-xl font-bold">Title</h2>
      <p>
        {" "}
        Viewing Count:120 | Saving Count: 45 |Number of Arts: 21|
        Specification:High Quality
      </p>
    </div>
  );
};

export default ArtCollectionCard;
