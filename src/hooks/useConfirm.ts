let resolveCallback: any;
function useConfirm(
  setPopupWIthConfirmOptions: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      text: string;
    }>
  >,
) {
  const confirm = (text: string) => {
    setPopupWIthConfirmOptions({isOpen: true, text});
    return new Promise<boolean>((res) => {
      resolveCallback = res;
    });
  };

  const closeConfirm = () => {
    setPopupWIthConfirmOptions({isOpen: false, text: ''});
  };

  const handleConfirm = () => {
    closeConfirm();
    resolveCallback(true);
  };

  const handleCancel = () => {
    closeConfirm();
    resolveCallback(false);
  };

  return { confirm, closeConfirm, handleConfirm, handleCancel };
}

export default useConfirm;
