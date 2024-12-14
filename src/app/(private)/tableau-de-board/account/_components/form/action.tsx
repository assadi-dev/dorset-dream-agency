"use server";

export const updateEmployeeData = async (formData: FormData) => {
    const employeeData = {
        email: formData.get("email"),
        lastName: formData.get("lastName"),
        firstName: formData.get("firstName"),
        phone: formData.get("phone"),
    };
};
