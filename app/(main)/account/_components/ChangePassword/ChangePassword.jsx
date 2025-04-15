"use client"
import { passwordChange } from "@/app/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePassword({ email }) {
  const [passwordState, setPasswordState] = useState({
    oldPassword: "",
    newPassword: "",
    reTypeNewPassword: ""
  });

  console.log(email);
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setPasswordState({ ...passwordState, [key]: value })
  }

  const doPasswordChange = async (e) => {
    e.preventDefault();

    if (passwordState?.newPassword !== passwordState?.reTypeNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await passwordChange(email, passwordState?.oldPassword, passwordState?.newPassword);
      toast.success("Password changed successfully");
      setPasswordState({
        oldPassword: "",
        newPassword: "",
        reTypeNewPassword: ""
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Something went wrong");
    }
  }

  return (
    <div>
      <h5 className="text-lg font-semibold mb-4">
        Change password :
      </h5>
      <form onSubmit={doPasswordChange}>
        <div className="grid grid-cols-1 gap-5">
          <div>
            <Label className="mb-2 block">Old password :</Label>
            <Input
              type="password"
              name="oldPassword"
              onChange={handleChange}
              placeholder="Old password"
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">New password :</Label>
            <Input
              type="password"
              name="newPassword"
              placeholder="New password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label className="mb-2 block">
              Re-type New password :
            </Label>
            <Input
              type="password"
              name="reTypeNewPassword"
              onChange={handleChange}
              placeholder="Re-type New password"
              required
            />
          </div>
        </div>
        {/*end grid*/}
        <Button className="mt-5 cursor-pointer" type="submit">
          Save password
        </Button>
      </form>
    </div>
  )
}
