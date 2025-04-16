'use client'
import { updateUserInfo } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactInfo({ email, phone, socialMedia }) {
  const [contactInfo, setContactInfo] = useState({
    phone: phone || "",
    socialMedia: {
      facebook: socialMedia?.facebook || "",
      linkedin: socialMedia?.linkedin || "",
      github: socialMedia?.github || "",
    },
  });

  // Simple phone validation
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (["facebook", "linkedin", "github"].includes(name)) {
      setContactInfo((prev) => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [name]: value,
        },
      }));
    } else {
      setContactInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleContactInfo = async (e) => {
    e.preventDefault();

    // Validate phone before submitting
    if (!validatePhone(contactInfo.phone)) {
      toast.warning("Please enter a valid phone number.");
      return;
    }
    
    try {
      await updateUserInfo(email, contactInfo);
      toast.success("Contact info updated successfully")
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">Contact Info :</h5>
      <form onSubmit={handleContactInfo}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Phone No. :</Label>
            <Input
              name="phone"
              type="tel"
              value={contactInfo.phone}
              onChange={handleChange}
              placeholder="Phone :"
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">Social Media Links :</Label>
            <Input
              type="url"
              name="facebook"
              value={contactInfo.socialMedia.facebook}
              onChange={handleChange}
              className="mb-2"
              placeholder="Facebook URL"
            />
            <Input
              type="url"
              name="linkedin"
              value={contactInfo.socialMedia.linkedin}
              onChange={handleChange}
              className="mb-2"
              placeholder="LinkedIn URL"
            />
            <Input
              type="url"
              name="github"
              value={contactInfo.socialMedia.github}
              onChange={handleChange}
              className="mb-2"
              placeholder="GitHub URL"
            />
          </div>
        </div>
        <Button className="mt-5 cursor-pointer" type="submit">
          Add
        </Button>
      </form>
    </div>
  );
}
