import { Button } from "../ui/button";
import { Input } from "../ui/input";

const CommonForm = ({
  action,
  isBtnDisabled,
  btnType,
  buttonText,
  formData,
  setFormData,
  formControls,
  handleFileChange,
}) => {
  function handleInputChange(e, name) {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function renderInputByComponentType(getCurrentControl) {
    let content = null;

    switch (getCurrentControl.componentType) {
      case "input":
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name] || ""}
              onChange={(e) => handleInputChange(e, getCurrentControl.name)}
              className="w-full rounded-md px-4 border bg-gray-100 outline-none text-lg drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        );

        break;
      case "file":
        content = (
          <label
            htmlFor={getCurrentControl.name}
            className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
          >
            <h2>{getCurrentControl.label}</h2>
            <Input
              onChange={handleFileChange}
              id={getCurrentControl.name}
              type="file"
            />
          </label>
        );

        break;
      default:
        content = (
          <div className="relative flex items-center mt-8">
            <Input
              type="text"
              disabled={getCurrentControl.disabled}
              placeholder={getCurrentControl.placeholder}
              name={getCurrentControl.name}
              id={getCurrentControl.name}
              value={formData[getCurrentControl.name] || ""}
              onChange={(e) => handleInputChange(e, getCurrentControl.name)}
              className="w-full rounded-md px-4 border bg-gray-100 outline-none text-lg drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        );

        break;
    }
    return content;
  }

  return (
    <form action={action}>
      {formControls.map((control) => renderInputByComponentType(control))}
      <div className="mt-6 w-full">
        <Button
          className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
          type={btnType || "submit"}
          disabled={isBtnDisabled}
        >
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default CommonForm;