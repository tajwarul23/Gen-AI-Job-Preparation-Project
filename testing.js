import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3001/events";

// --- READ HOOK ---
export function useMeetups() {
  return useQuery({
    queryKey: ["meetups"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data;
    },
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}

// --- CREATE MUTATION HOOK ---
export function useCreateMeetup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMeetupTitle) => {
      const { data } = await axios.post(API_URL, {
        id: Date.now(),
        title: newMeetupTitle,
      });

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meetups"],
      });
    },
  });
}

// --- UPDATE MUTATION HOOK ---
export function useToggleRsvp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (meetupId) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const { data } = await axios.post(
        `${API_URL}/${meetupId}/rsvp`
      );

      return data;
    },

    // Optimistic Update
    onMutate: async (meetupId) => {
      await queryClient.cancelQueries({
        queryKey: ["meetups"],
      });

      const previousMeetups = queryClient.getQueryData(["meetups"]);

      queryClient.setQueryData(["meetups"], (oldData) => {
        if (!oldData) return [];

        return oldData.map((meetup) =>
          meetup.id === meetupId
            ? { ...meetup, rsvpd: !meetup.rsvpd }
            : meetup
        );
      });

      return { previousMeetups };
    },

    onError: (error, meetupId, context) => {
      if (context?.previousMeetups) {
        queryClient.setQueryData(
          ["meetups"],
          context.previousMeetups
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["meetups"],
      });
    },
  });
}