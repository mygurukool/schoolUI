import React from "react";
import { makeStyles } from "@mui/styles";
import ModalContainer from "../ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../redux/action/utilActions";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import FormCreator from "../Form/FormCreator";
import { getAllStudents } from "../../redux/action/studentActions";
import { getAllTeachers } from "../../redux/action/teacherActions";
import {
  changeEventJoiningStatus,
  createEvent,
  deleteEvent,
  editEvent,
  getEvents,
} from "../../redux/action/eventActions";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import useLanguages from "../../hooks/useLanguage";

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

  const [acceptState, setAcceptState] = React.useState({
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
      setAcceptState({
        open: true,
        data: data,
      });
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

  const onCloseAccept = (data) => {
    setAcceptState({
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
    if (!data.id || !data._id) {
      dispatch(
        createEvent(returnData, () => {
          dispatch(getEvents(calendarState));
          onCloseEvent();
        })
      );
    } else {
      dispatch(
        editEvent(returnData, () => {
          dispatch(getEvents(calendarState));
          onCloseEvent();
        })
      );
    }
  };

  const submitAccept = (data) => {
    dispatch(
      changeEventJoiningStatus(
        {
          userId: id,
          eventId: acceptState?.data?.id || acceptState?.data._id,
          status: data,
        },
        () => {
          onCloseAccept();
          dispatch(getEvents(calendarState));
        }
      )
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

  const eventPropGetter = (event, start, end, isSelected) => {
    let foundUser = {};

    // let newStyle = {
    //   backgroundColor: "lightgrey",
    //   color: "black",
    //   borderRadius: "0px",
    //   border: "none",
    // };

    // if (event.isMine) {
    //   newStyle.backgroundColor = "lightgreen";
    // }

    // return {
    //   className: "",
    //   style: newStyle,
    // };
  };

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
      <AcceptEvent
        {...acceptState}
        onClose={onCloseAccept}
        onSubmit={submitAccept}
        userId={id}
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
          eventPropGetter={eventPropGetter}
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
  const isEditMode = Boolean(data?.users);
  const translate = useLanguages()
  const users = [
    {
      type: "label",
      text: "Teachers",
    },
    ...teachers,
    {
      type: "label",
      text: "Students",
    },
    ...students,
  ];

  return (
    <ModalContainer
      open={open}
      title={data?.title ? "Edit Event" : "New Event"}
      onClose={() => onClose()}
      size={isEditMode ? "lg" : "xs"}
      hideButtons
    >
      <Grid container spacing={2}>
        <Grid item lg={isEditMode ? 6 : 12}>
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
              users: data?.users?.map((u) => u.id),
            }}
            optionsData={{
              users: users,
            }}
            onDelete={() => onDelete(data?.id || data?._id)}
          />
        </Grid>
        {isEditMode && (
          <Grid item lg={6}>
            <List
              sx={{
                overflow: "auto",
                maxHeight: 300,
              }}
            >
              {data.users.map((u, ui) => {
                return (
                  <ListItem
                    key={ui}
                    secondaryAction={
                      <Chip label={u.status} variant="outlined" />
                    }
                    disablePadding
                  >
                    <ListItemAvatar>
                      <Avatar alt={`${u.name}`} src={`${u.profileUrl}`} />
                    </ListItemAvatar>
                    <ListItemText primary={`${u.name}`} secondary={u.email} />
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        )}
      </Grid>
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
    {
      type: "multiselect",
      name: "users",
      multiple: true,
      label: "Users",
      placeholder: "Select Users",
      required: false,
      size: 12,
      hasOptions: true,
      optionLabelProp: "name",
      optionValueProp: "_id",
      allowSelectAll: true,
    },
    // ...(isTeacher
    //   ? [
    // {
    //   type: "multiselect",
    //   name: "students",
    //   multiple: true,
    //   label: "Students",
    //   placeholder: "Select Students",
    //   required: false,
    //   size: 12,
    //   hasOptions: true,
    //   optionLabelProp: "name",
    //   optionValueProp: "_id",
    //   allowSelectAll: true,
    // },
    //     ]
    //   : [
    //       {
    //         type: "select",
    //         name: "teachers",
    //         multiple: true,
    //         label: "Teacher",
    //         placeholder: "Select Teacher",
    //         required: false,
    //         size: 12,
    //         hasOptions: true,
    //         optionLabelProp: "name",
    //         optionValueProp: "_id",
    //       },
    //     ]),
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

const AcceptEvent = ({ open, onClose, data, onSubmit, userId }) => {
  const translate = useLanguages()
  return (
    <ModalContainer
      open={open}
      title={`You have a invitation for ${data?.title}`}
      onClose={onClose}
      size="xs"
      hideButtons
    >
      <List title="Invited People">
        {data?.users.map((u, ui) => {
          return (
            <ListItem
              key={ui}
              secondaryAction={<Chip label={u.status} variant="outlined" />}
              disablePadding
            >
              <ListItemAvatar>
                <Avatar alt={`${u.name}`} src={`${u.profileUrl}`} />
              </ListItemAvatar>
              <ListItemText primary={`${u.name}`} secondary={u.email} />
            </ListItem>
          );
        })}

        {/* {data?.users
          ?.filter((u) => u.id !== userId)
          .map((u, ui) => {
            return (
              <ListItem
                key={ui}
                secondaryAction={<Chip label={u.status} variant="outlined" />}
                disablePadding
              >
                <ListItemAvatar>
                  <Avatar alt={`${u.name}`} src={`${u.profileUrl}`} />
                </ListItemAvatar>
                <ListItemText primary={`${u.name}`} secondary={u.email} />
              </ListItem>
            );
          })} */}
      </List>

      <Stack direction="column" spacing={2}>
        <h3>{translate("ARE_YOU_JOINING")}</h3>

        <Stack direction="row" justifyContent="space-between">
          <div>
            <Button
              variant="contained"
              color="success"
              size="sm"
              onClick={() => {
                onSubmit("Joining");
              }}
            >
              {translate("YES")}
            </Button>
          </div>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              color="error"
              size="sm"
              onClick={() => {
                onSubmit("Not Joining");
              }}
            >
              {translate("NO")}

            </Button>
            <Button
              variant="contained"
              color="warning"
              size="sm"
              onClick={() => {
                onSubmit("May Be Joining");
              }}
            >
              {translate("MAYBE")}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </ModalContainer>
  );
};
