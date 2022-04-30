import { Table, Select } from "antd";
import { useEffect, useState } from "react";
import { cities } from "../../db/cities";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getCargoData,
  patchCargoData,
  setCurrentRoute,
} from "../../redux/actions/main";
import "./table.css";

const { Option } = Select;

const enum SelectType {
  DEPARTURE = "departure",
  ARRIVAL = "arrival",
}

export default function SideTable() {
  const curentRoute = useAppSelector((store) => store.route);
  const data = useAppSelector((store) => store.cargo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCargoData());
  }, [dispatch]);

  const selectChange = (value: string, type: SelectType) => {
    let data: CargoData;
    switch (type) {
      case SelectType.DEPARTURE:
        data = { ...curentRoute, departure: value };
        break;

      case SelectType.ARRIVAL:
        data = { ...curentRoute, arrival: value };
        break;
    }
    dispatch(patchCargoData([data]));
    dispatch(setCurrentRoute(data));
  };

  const renderSelect = (defaultCity: string, type: SelectType) => (
    <Select
      defaultValue={defaultCity}
      className="select"
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
      render: (city: string) => renderSelect(city, SelectType.DEPARTURE),
    },
    {
      title: "Назначение",
      key: "arrival",
      dataIndex: "arrival",
      render: (city: string) => renderSelect(city, SelectType.ARRIVAL),
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
    </>
  );
}
