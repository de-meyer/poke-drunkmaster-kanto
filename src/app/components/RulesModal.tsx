import Image from "next/image";
interface ModalProps {
  onToggleModal: (value: boolean) => void;
}

export default function RulesModal({ onToggleModal }: ModalProps) {
  const toggleModal = () => {
    onToggleModal(false);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 h-screen w-screen">
      <div className="fixed bottom-0 left-0 right-0 top-0 h-screen w-screen bg-slate-500 opacity-50"></div>
      <div className="absolute left-1/2 top-1/3 w-96 -translate-x-1/2 rounded-lg border-2 bg-white p-2">
        <Image
          style={{ imageRendering: "pixelated" }}
          className="inline-block w-full rounded-md"
          src="/images/73_rules.jpg"
          alt="rules"
          width={340}
          height={100}
        />
        <button onClick={toggleModal} className="rounded-lg bg-red-700 p-2">
          Close
        </button>
      </div>
    </div>
  );
}
