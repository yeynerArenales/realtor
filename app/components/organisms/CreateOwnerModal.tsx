"use client";

import { useState, useEffect } from "react";
import {
  CustomButton,
  IconButton,
  Spinner,
  Input,
  Textarea,
} from "../atoms";
import { Owner } from "../../types";

interface CreateOwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ownerData: Omit<Owner, "id" | "photo">) => Promise<void>;
}

export default function CreateOwnerModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateOwnerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    birthday: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isSubmitting]);

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", address: "", birthday: "" });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
    } else {
      const selectedDate = new Date(formData.birthday);
      const today = new Date();
      if (selectedDate > today) {
        newErrors.birthday = "Birthday cannot be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error creating owner:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={() => !isSubmitting && onClose()}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Create New Owner
            </h2>
            <IconButton
              onClick={onClose}
              ariaLabel="Close modal"
              className="bg-white hover:bg-stone-50 p-1.5 sm:p-2"
              disabled={isSubmitting}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-stone-700"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </IconButton>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              id="name"
              name="name"
              label="Name *"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              error={errors.name}
              placeholder="Enter owner name"
            />

            <Textarea
              id="address"
              name="address"
              label="Address *"
              value={formData.address}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={3}
              error={errors.address}
              placeholder="Enter address"
            />

            <Input
              type="date"
              id="birthday"
              name="birthday"
              label="Birthday *"
              value={formData.birthday}
              onChange={handleChange}
              disabled={isSubmitting}
              max={new Date().toISOString().split("T")[0]}
              error={errors.birthday}
            />

            <div className="flex gap-3 pt-4">
              <CustomButton
                type="button"
                onClick={onClose}
                variant="secondary"
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </CustomButton>
              <CustomButton
                type="submit"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner size="sm" /> : "Create Owner"}
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

