"use client";
import { database } from "@/configs/filebaseConfig";
import { get, onValue, ref } from "firebase/database";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const [bright, setBright] = useState<string>("");

  useEffect(() => {
    const usersRef = ref(database, "Monitor");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(
            ([id, data]: any) => ({
              id,
              ...data,
            })
          );

          const brightData = userArray.find((e) => e.id == "Relay Output 2");
          setBright(brightData.data);
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
          })
        );

        const brightData = userArray.find((e) => e.id == "Relay Output 2");
        setBright(brightData.data);
      }
    });
  }, []);

  return (
    <div className="pt-5 text-center">
      <div
        className="border border-black p-4 inline-block"
        //style={{ backgroundColor: "gray" }}
      >
        <h3 className="font-medium text-black">
          <span className="font-medium text-black">TÊN ĐỀ TÀI:</span> Ứng dụng BMS trong điều khiển giám sát hệ thống chiếu sáng (BMS điều khiển LED Driver, DALI)
        </h3>
      </div>

      <div className="flex justify-center items-start mt-5">
        {bright == "1" ? (
          <Image
            src="/on.gif"
            alt="Image"
            width={900}
            height={200}
            style={{ width: "400px" }}
          />
        ) : (
          <Image
            src="/off.jpg"
            alt="Image"
            width={900}
            height={200}
            style={{ width: "400px" }}
          />
        )}

        {/* <div className="ml-5 text-left" style={{ position: 'absolute', top: '450px', left: '1000px', zIndex: 99 }}>
          <table>
            <tbody>
              <tr>
                <td className="font-medium text-black">GVHD</td>
                <td className="font-medium text-black">TS. Lê Trọng Nghĩa</td>
              </tr>
              <tr>
                <td className="font-medium text-black">Sinh viên thực hiện</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td className="font-medium text-black">Tạ Hoàng Phú 20142152</td>
              </tr>
              <tr>
                <td></td>
                <td className="font-medium text-black">Sơn Linh Vủ 20142618</td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}
