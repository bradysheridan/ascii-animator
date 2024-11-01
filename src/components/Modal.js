import { useContext } from 'react'
import ControlVideoSettings from '@/components/controls/ControlVideoSettings';
import { ControlsContext } from '@/components/ControlsContext';

export default function Modal() {
  const context = useContext(ControlsContext);
  const {
    modalOpen,
    setModalOpen,
    sourceVideo,
    setVideoUploadIsLoading,
    setSelectedFrame,
    setSourceImages,
    updateAsciiStrings,
    animationFramerate,
    setAnimationFramerate
  } = context;

  return(
    <>
      {modalOpen && sourceVideo && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[rgba(255,255,255,0.8)]">
          <ControlVideoSettings
            sourceVideo={sourceVideo}
            setVideoUploadIsLoading={setVideoUploadIsLoading}
            setSelectedFrame={setSelectedFrame}
            setSourceImages={setSourceImages}
            updateAsciiStrings={updateAsciiStrings}
            animationFramerate={animationFramerate}
            setAnimationFramerate={setAnimationFramerate}
            setModalOpen={setModalOpen}
          />
        </div>
      )}
    </>
  );
}