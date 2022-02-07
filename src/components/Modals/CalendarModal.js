import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/action/utilActions";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import FormCreator from "../Form/FormCreator";
import { getAllStudents } from "../../redux/action/studentActions";
import { getAllTeachers } from "../../redux/action/teacherActions";
import {
  createEvent,
  deleteEvent,
  getEvents,
} from "../../redux/action/eventActions";

const localizer = momentLocalizer(moment);

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const CalendarModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    modalOpen,
    modalData,
    spinner: isLoading,
  } = useSelector((state) => state.util);
  const { organizationId, id, isTeacher } = useSelector((state) => state.user);
  const { currentGroup, students, teachers, events, groups } = useSelector(
    (state) => state.common
  );

  const groupId = currentGroup?.id || currentGroup?._id;

  const open = modalOpen === "calendar";

  const [eventState, setEventState] = React.useState({
    open: false,
    data: undefined,
  });
  const [calendarState, setCalendarState] = React.useState({
    start: moment().startOf("day").toDate(),
    end: moment().endOf("day").add(1, "minute").toDate(),
    isToday: true,
  });

  const handleGetEvents = (dates) => {
    dispatch(getEvents(dates));
    setCalendarState(dates);
  };

  const onClickEvent = (data) => {
    if (data.title && data.createdBy !== id) {
      return;
    }
    setEventState({
      open: true,
      data: data,
    });
  };

  const onCloseEvent = (data) => {
    setEventState({
      open: false,
      data: undefined,
    });
  };

  const submitEvent = (data) => {
    const returnData = {
      ...data,
      end: moment.isMoment(data.end) ? data.end.toDate() : data.end,
      start: moment.isMoment(data.start) ? data.start.toDate() : data.start,
      status: isTeacher ? "active" : "pending",
    };

    dispatch(
      createEvent(returnData, () => {
        dispatch(getEvents(calendarState));
        onCloseEvent();
      })
    );
  };

  const handleDeleteEvent = (data) => {
    dispatch(
      deleteEvent(data, () => {
        dispatch(getEvents(calendarState));
        onCloseEvent();
      })
    );
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const onRangeChange = (d) => {
    if (Array.isArray(d)) {
      if (d.length === 1) {
        handleGetEvents({
          start: moment(d[0]).startOf("day").toDate(),
          end: moment(d[0]).endOf("day").add(1, "minute").toDate(),
        });
      }
      if (d.length > 1) {
        handleGetEvents({
          start: d[0],
          end: d[6],
        });
      }
    } else {
      handleGetEvents({
        start: d.start,
        end: d.end,
      });
    }
  };

  React.useEffect(() => {
    if (open) {
      dispatch(
        getAllStudents({
          groupId,
        })
      );

      dispatch(
        getAllTeachers({
          groupId: groupId,
        })
      );
      handleGetEvents({
        start: moment().startOf("day").subtract(1, "minute").toDate(),
        end: moment().endOf("day").add(1, "minute").toDate(),
      });
    }
  }, [open]);

  //   React.useEffect(() => {
  //     if (open) {
  //       dispatch(getEvents(calendarState));
  //     }
  //   }, [open, calendarState]);
  return (
    <ModalContainer
      open={open}
      title={"Calendar"}
      onClose={() => handleClose()}
      size="lg"
      hideButtons
    >
      <EventModal
        {...eventState}
        onClose={onCloseEvent}
        onSubmit={submitEvent}
        isTeacher={isTeacher}
        students={students}
        teachers={teachers}
        userId={id}
        onDelete={handleDeleteEvent}
      />
      {isLoading ? (
        "loading"
      ) : (
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="day"
          events={events.map((e) => {
            return {
              ...e,
              start: moment(e.start).toDate(),
              end: moment(e.end).toDate(),
            };
          })}
          style={{ height: "80vh" }}
          onSelectSlot={(data) => onClickEvent(data)}
          onSelectEvent={(data) => onClickEvent(data)}
          onRangeChange={(d) => {
            onRangeChange(d);
          }}
          selectable
          formats={{
            agendaHeaderFormat: ({ start, end }) => {
              return (
                moment.utc(start).format("DD/MM/YYYY") +
                " - " +
                moment.utc(end).format("DD/MM/YYYY")
              );
            },
          }}
        />
      )}
    </ModalContainer>
  );
};

export default CalendarModal;

const EventModal = ({
  open,
  onClose,
  data,
  onSubmit,
  isTeacher,
  students,
  teachers,
  userId,
  onDelete,
}) => {
  return (
    <ModalContainer
      open={open}
      title={data?.title ? "Edit Event" : "New Event"}
      onClose={() => onClose()}
      size="xs"
      hideButtons
    >
      <FormCreator
        mode={data ? "edit" : "add"}
        onSubmit={(e) => onSubmit(e)}
        onCancel={onClose}
        formData={generateForm({
          isTeacher,
          isOwner: !data?.title
            ? data?.createdBy !== userId
              ? false
              : true
            : true,
        })}
        data={{
          ...data,
        }}
        optionsData={{
          students: students,
          teachers: teachers,
        }}
        onDelete={() => onDelete(data?.id || data?._id)}
      />
    </ModalContainer>
  );
};

const generateForm = ({ isOwner, isTeacher }) => {
  return [
    {
      type: "text",
      name: "title",
      label: "Event Name",
      placeholder: "eg: English, French",
      required: true,
      size: 12,
    },
    ...(isTeacher
      ? [
          {
            type: "multiselect",
            name: "students",
            multiple: true,
            label: "Students",
            placeholder: "Select Students",
            required: false,
            size: 12,
            hasOptions: true,
            optionLabelProp: "name",
            optionValueProp: "_id",
            allowSelectAll: true,
          },
        ]
      : [
          {
            type: "select",
            name: "teachers",
            multiple: true,
            label: "Teacher",
            placeholder: "Select Teacher",
            required: false,
            size: 12,
            hasOptions: true,
            optionLabelProp: "name",
            optionValueProp: "_id",
          },
        ]),
    {
      type: "dateTime",
      name: "start",
      label: "Start Date & Time",
      placeholder: "Start Date & Time",
      required: true,
      size: 6,
    },
    {
      type: "dateTime",
      name: "end",
      label: "End Date & Time",
      placeholder: "end Date & Time",
      required: true,
      size: 6,
    },
  ];
};
const eventForm = [
  {
    type: "text",
    name: "eventName",
    label: "Event Name",
    placeholder: "eg: English, French",
    required: true,
    size: 12,
  },
  //   {
  //     type: "multiselect",
  //     name: "groupId",
  //     label: "Class Name",
  //     placeholder: "Name of the Class the Course should belong to.",
  //     required: false,
  //     size: 12,
  //     hasOptions: false,
  //     optionLabelProp: "groupName",
  //     optionValueProp: "id",
  //   },

  {
    type: "dateTime",
    name: "start",
    label: "Start Date & Time",
    placeholder: "Start Date & Time",
    required: true,
    size: 6,
  },
  {
    type: "dateTime",
    name: "end",
    label: "End Date & Time",
    placeholder: "end Date & Time",
    required: true,
    size: 6,
  },
];
