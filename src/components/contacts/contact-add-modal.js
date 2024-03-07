import { useAuth } from "src/hooks/use-auth";
import { Modal } from "../common/modal";
import { ContactAddForm } from "./contact-add-form";
import { ContactService } from "src/services";

export const ContactAddModal = ({ contact, open, setOpen }) => {
  const { refresh } = useAuth();

  const handleSubmit = async (values) => {
    await ContactService.add(values);
    refresh();
  };

  const handleUpdate = async (id, values) => {
    await ContactService.update(id, values);
    refresh();
  }

  return (
    <Modal title={`${contact ? "Update Contact" : "Add New Contact"}`} open={open} onClose={() => setOpen(false)} size="md">
      <ContactAddForm contact={contact} handleUpdate={handleUpdate} submitForm={handleSubmit} onClose={() => setOpen(false)} />
    </Modal>
  );
};
