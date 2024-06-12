import { database } from "@/configs/filebaseConfig";
import { get, getDatabase, onValue, ref, update } from "firebase/database";
import { truncate } from "fs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { Props } from "react-apexcharts";

// interface Props {
//   onChangeRegime: (enanble: number, value: number) => void;
//   isEnable: boolean;
// }
const SwitcherFour = () => {
  const [isEnable, setIsEnable] = useState<boolean>();
  const customId = "custom-id-yes";


  useEffect(() => {
    const usersRef = ref(database, "control");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]: any) => ({
              id,
              ...data,
            }),
          );
 
          const isEnableDO1 = userArray.find(
            (e) => e.id == "Override Enable DO1",
          );

          isEnableDO1.data == 1 ? setIsEnable(true) : setIsEnable(false);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      onValue(usersRef, (snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]: any) => ({
              id,
              ...data,
            }),
          );
  
          const isEnableDO1 = userArray.find((e) => e.id == "Override Enable DO1");
          isEnableDO1.data == 1 ? setIsEnable(true) : setIsEnable(false);
        }
      });
  }, []);

  const notify = () =>
    toast.success("Update successfully!", {
      toastId: customId,
    });

  const notifyError = () =>
    toast.error("Update Error!", {
      toastId: customId,
    });


  
  const updateOverrideEnableDO1 = (enable: number, value: number) => {
    const db = getDatabase();
    const enableData = { data: enable };
    const valueData = { data: value };

    const updates: any = {};
    updates["/control/" + "Override Enable DO1"] = enableData;

    updates["/control/" + "Override Value DO1"] = valueData;

    return update(ref(db), updates)
      .then(() => {
        notify();
        // setIsEditPointAO(false);
      })
      .catch((e) => {
        console.log(e);
        notifyError();
      });
  };


  return (
    <div>
      <label
        htmlFor="toggle4"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle4"
            className="sr-only"
            onChange={() => {
              setIsEnable(!isEnable);
              isEnable ? updateOverrideEnableDO1(0, 0) : updateOverrideEnableDO1(1, 1);
              
            }}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-6"></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isEnable == true ? "!right-1 !translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherFour;
