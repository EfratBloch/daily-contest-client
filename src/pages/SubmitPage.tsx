import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { getContest } from "../api/contests"
import { useNavigate, useParams } from "react-router-dom"
import { getErrorMessage } from "../api/client";
import { createSubmission } from "../api/submissions"

const submissionSchema = z.object({
    title: z.string().min(2, 'יש להזין כותרת לפחות 2 תווים').max(100, 'אפשר עד 100 תווים'),
    description: z.string("יש להזין תיאור").max(500),
    file: z.custom<FileList>().refine((files) => files.length == 1, "אין קובץ")
})

type SubmissionForm = z.infer<typeof submissionSchema>

export function SubmitPage() {
    const { id } = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { mutate, isPending, error:submitError } = useMutation({
        mutationFn: (data: SubmissionForm) => createSubmission(Number(id), data.title,data.description,data.file[0]) ,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gallery',id] });
            queryClient.invalidateQueries({ queryKey: ['contests'] });
            navigate(`/contests/${id}`)
        }
    })
    const { data: contest, isLoading, error } = useQuery({ queryKey: ['contest', id], queryFn: () => getContest(Number(id)) })
    const { register, handleSubmit, formState: { errors } } =
        useForm<SubmissionForm>({ resolver: zodResolver(submissionSchema) })
    function onSubmit(data: SubmissionForm) { mutate(data) }
    if (isLoading)
        return <p>טוען...</p>
    if (error)
        return <p>{getErrorMessage(error)}</p>
    return <>
        <h1>הגשה לתחרות: {contest?.title}</h1>
        <p>{contest?.instructions}</p>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={isPending}>
            <div>
                <label>כותרת</label>
                <input {...register('title')} type="text" />
                <p>{errors.title?.message}</p>
            </div>
            <div>
                <label>תיאור</label>
                <textarea {...register('description')} />
                <p>{errors.description?.message}</p>
            </div>
            <div>
                <label>קובץ</label>
                <input type="file" {...register('file')} accept={contest?.submissionType === "IMAGE" ? "image/png,image/jpeg,image/webp" : ".txt,.pdf,.docx"} />
                <p>{errors.file?.message}</p>
            </div>
            {submitError && <p>{getErrorMessage(submitError)}</p>}
            <button type="submit" >{isPending?"שולח":"הגשה"}</button>


            </fieldset>
        </form>
    </>
}