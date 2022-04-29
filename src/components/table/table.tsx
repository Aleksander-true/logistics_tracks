import { Table, Select } from "antd";
import { Key } from "antd/lib/table/interface";
import { useEffect, useState } from "react";
import { cities } from "../../db/cities";
import {
  getCargoData,
  patchCargoData,
  setCurrentRoute,
} from "../../redux/actions/main";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const { Option } = Select;

export default function SideTable() {
  const curentRoute = useAppSelector((store) => store.route);
  const data = useAppSelector((store) => store.cargo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("useEffect", data);
    dispatch(getCargoData());
  }, [dispatch]);

  const selectChange = (value: string, type: "departure" | "arrival") => {
    let data: CargoData;
    switch (type) {
      case "departure":
        data = { ...curentRoute, departure: value };
        break;

      case "arrival":
        data = { ...curentRoute, arrival: value };
        break;
    }
    dispatch(patchCargoData([data]));
    dispatch(setCurrentRoute(data));
  };

  const renderSelect = (defaultCity: string, type: "departure" | "arrival") => (
    <Select
      defaultValue={defaultCity}
      style={{ width: 120 }}
      onChange={(value) => selectChange(value, type)}
    >
      {cities.map((city: string, i) => {
        return (
          <Option key={`${city}_${i}`} value={city}>
            {city}
          </Option>
        );
      })}
    </Select>
  );

  const columns = [
    {
      title: "Заказчик",
      dataIndex: "customer",
      key: "customer",
      render: (text: string) => <i>{text}</i>,
    },
    {
      title: "Груз",
      dataIndex: "cargo",
      key: "cargo",
    },
    {
      title: "Отправление",
      dataIndex: "departure",
      key: "departure",
      render: (city: string) => renderSelect(city, "departure"),
    },
    {
      title: "Назначение",
      key: "arrival",
      dataIndex: "arrival",
      render: (city: string) => renderSelect(city, "arrival"),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([""]);

  const rowSelection = {
    selectedRowKeys,
    onSelect: (record: CargoData) => {
      setSelectedRowKeys([record.key]);
    },
  };

  const onSelectChange = (record: CargoData) => {
    setSelectedRowKeys([record.key]);
    if (record.key !== curentRoute.key) {
      dispatch(setCurrentRoute(record));
    }
  };

  return (
    <>
      <Table
        rowSelection={{ type: "radio", ...rowSelection }}
        onRow={(record: CargoData) => ({
          onClick: () => {
            onSelectChange(record);
          },
        })}
        columns={columns}
        dataSource={data}
      />
      <h2>departure {curentRoute.departure}</h2>
      <h2>arrival {curentRoute.arrival}</h2>
    </>
  );
}
