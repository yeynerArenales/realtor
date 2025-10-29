"use client";

import { useState, useEffect } from "react";
import { CustomButton, IconButton, Spinner, Input, Textarea } from "../atoms";
import { useOwners } from "../../hooks/useOwners";
import { CreatePropertyData } from "../../services/types";

interface CreatePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (propertyData: CreatePropertyData) => Promise<void>;
}

export default function CreatePropertyModal({
  isOpen,
  onClose,
  onSubmit,
}: CreatePropertyModalProps) {
  const { owners } = useOwners();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    idOwner: "",
    price: "",
    codeInternal: "",
    year: "",
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
      setFormData({
        name: "",
        address: "",
        idOwner: "",
        price: "",
        codeInternal: "",
        year: "",
      });
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

    if (!formData.idOwner) {
      newErrors.idOwner = "Owner is required";
    }

    const priceNum = parseFloat(formData.price);
    if (!formData.price || isNaN(priceNum) || priceNum <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.codeInternal.trim()) {
      newErrors.codeInternal = "Internal code is required";
    }

    const yearNum = parseInt(formData.year, 10);
    const currentYear = new Date().getFullYear();
    if (
      !formData.year ||
      isNaN(yearNum) ||
      yearNum <= 0 ||
      yearNum > currentYear
    ) {
      newErrors.year = "Valid year is required";
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
      await onSubmit({
        name: formData.name,
        address: formData.address,
        idOwner: formData.idOwner,
        price: parseFloat(formData.price),
        codeInternal: formData.codeInternal,
        year: parseInt(formData.year, 10),
      });
      onClose();
    } catch (error) {
      console.error("Error creating property:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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
        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
              Create New Property
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
              placeholder="Enter property name"
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

            <div>
              <label
                htmlFor="idOwner"
                className="block text-sm font-medium text-stone-700 mb-2"
              >
                Owner *
              </label>
              <select
                id="idOwner"
                name="idOwner"
                value={formData.idOwner}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors disabled:bg-stone-100 disabled:cursor-not-allowed ${
                  errors.idOwner
                    ? "border-red-500 focus:ring-red-500"
                    : "border-stone-300 focus:border-stone-500 focus:ring-stone-500"
                }`}
              >
                <option value="">Select an owner</option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </select>
              {errors.idOwner && (
                <p className="mt-1 text-sm text-red-600">{errors.idOwner}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="number"
                id="price"
                name="price"
                label="Price (USD) *"
                value={formData.price}
                onChange={handleChange}
                disabled={isSubmitting}
                error={errors.price}
                placeholder="Enter price"
                min="0"
              />

              <Input
                type="number"
                id="year"
                name="year"
                label="Year *"
                value={formData.year}
                onChange={handleChange}
                disabled={isSubmitting}
                error={errors.year}
                placeholder="Enter year"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <Input
              type="text"
              id="codeInternal"
              name="codeInternal"
              label="Internal Code *"
              value={formData.codeInternal}
              onChange={handleChange}
              disabled={isSubmitting}
              error={errors.codeInternal}
              placeholder="Enter internal code"
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
                {isSubmitting ? <Spinner size="sm" /> : "Create Property"}
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
