const convertBase64 = (file: File, onSuccess: (payload: string) => void): void => {
  const fileReader: FileReader = new FileReader();
  fileReader.readAsDataURL(file)
  fileReader.onload = (e: ProgressEvent<FileReader>) => {
    if (!e.target) return
    onSuccess(e.target.result as string)
  }
}

export {
  convertBase64
}