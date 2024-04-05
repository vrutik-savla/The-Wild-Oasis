import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  // 356. Editing a Cabin
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  // 352. Introducing Another Library: React Hook Form
  // 353. Creating a New Cabin
  // 354. Handling Form Errors
  // 356. Editing a Cabin
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // console.log(formState);

  // 357. Abstracting React Query Into Custom Hooks
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  /* // 353. Creating a New Cabin
  const queryClient = useQueryClient();
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),
    onSuccess: () => {
      toast.success("New cabin successfully created");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  }); */

  // 356. Editing a Cabin
  /*const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });*/

  // 356. Editing a Cabin
  const isWorking = isCreating || isEditing;

  // 352. Introducing Another Library: React Hook Form
  function onSubmit(data) {
    // console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    // 356. Editing a Cabin
    if (isEditSession)
      editCabin(
        {
          newCabinData: { ...data, image },
          id: editId,
        },
        {
          onSuccess: (/*data*/) => {
            // console.log(data);
            reset();
            onCloseModal?.(); //367. Building a Modal Window Using a React Portal
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (/*data*/) => {
            // console.log(data);
            reset();
            onCloseModal?.(); //367. Building a Modal Window Using a React Portal
          },
        }
      ); //353. Creating a New Cabin //355. Uploading Images to Supabase
  }
  function onError(/*errors*/) {
    //354. Handling Form Errors
    // console.log(errors);
  }

  return (
    // 354. Handling Form Errors
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than the regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* 355. Uploading Images to Supabase */}
      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()} //367. Building a Modal Window Using a React Portal
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
